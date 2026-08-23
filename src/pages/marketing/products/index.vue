<template>
  <div class="products-management-dashboard overflow-hidden">
    <Breadcrumb />
    <!-- Header Section with Gradient Background -->
    <div class="mb-8 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-700 rounded-2xl p-8 text-white shadow-2xl">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-bold mb-2 text-white">Products</h1>
        </div>
        <div class="text-right">
          <p class="text-3xl font-bold text-white">{{ authStore?.user?.name ? authStore?.user?.name : 'Sales' }}, {{ authStore?.role ? authStore?.role : 'Director' }}</p>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast.show" 
      :class="`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl text-white transform transition-all duration-300 ${
        toast.type === 'success' 
          ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
          : 'bg-gradient-to-r from-red-500 to-rose-600'
      }`">
      {{ toast.message }}
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:inventory" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-blue-700 text-sm font-semibold">Total Products</h3>
        </div>
        <p class="text-3xl font-bold text-blue-800 mb-2">
          <span class="text-blue-600 font-bold flex gap-1">
            <count-up :end-val="stats?.totalProducts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-blue-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style="width: 75%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-2xl shadow-lg border border-cyan-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:trending-up" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-cyan-700 text-sm font-semibold">Active Products</h3>
        </div>
        <p class="text-3xl font-bold text-cyan-800 mb-2">
          <span class="text-cyan-600 font-bold flex gap-1">
            <count-up :end-val="stats?.activeProducts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-cyan-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full" style="width: 85%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-2xl shadow-lg border border-teal-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-teal-500 to-teal-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:category" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-teal-700 text-sm font-semibold">Categories</h3>
        </div>
        <p class="text-3xl font-bold text-teal-800 mb-2">
          <span class="text-teal-600 font-bold flex gap-1">
            <count-up :end-val="stats?.categories || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-teal-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full" style="width: 65%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:attach-money" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-emerald-700 text-sm font-semibold">Total Value</h3>
        </div>
        <p class="text-3xl font-bold text-emerald-800 mb-2">
          <span class="text-emerald-600 font-bold flex gap-1">
            $<count-up :end-val="stats?.totalValue || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-emerald-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" style="width: 90%"></div>
        </div>
      </div>
    </div>

    <!-- Products Table Section -->
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
      <!-- Table Header with Actions -->
      <div class="bg-gradient-to-r from-blue-50 to-cyan-100 border-b border-blue-200 px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex items-center gap-4">
            <h2 class="text-xl font-bold text-blue-800 flex items-center gap-2">
              <Icon name="material-symbols:inventory" class="text-blue-600 w-6 h-6" />
              Product Catalog
            </h2>
            <div class="flex items-center gap-2">
              <select class="bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Products</option>
                <option>Active Products</option>
                <option>Inactive Products</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
              <Icon name="material-symbols:filter-list" class="text-blue-600 w-5 h-5" />
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <!-- <button class="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
              <Icon name="material-symbols:add" class="w-5 h-5" />
              + Add New Product
            </button> -->
            <button class="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
              Bulk Actions
              <Icon name="material-symbols:keyboard-arrow-down" class="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <!-- Records Info and Pagination -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
          <div class="text-gray-600">
            Total Records: <span class="font-semibold text-blue-700">{{ products.length }}</span>
          </div>
          <div class="flex items-center gap-3">
            <select class="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
              <option>25 Per Page</option>
              <option>50 Per Page</option>
              <option>100 Per Page</option>
            </select>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span>1 - {{ products.length }}</span>
              <div class="flex gap-1">
                <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Icon name="material-symbols:keyboard-arrow-left" class="w-4 h-4" />
                </button>
                <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Icon name="material-symbols:keyboard-arrow-right" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Content -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-blue-50 to-cyan-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Product</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Category</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">SKU</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Price</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Stock</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Created</th>
              <th class="px-6 py-4 text-right text-xs font-bold text-blue-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-if="isLoading" class="hover:bg-blue-50 transition-colors">
              <td colspan="9" class="px-6 py-8 text-center text-gray-500">
                <div class="flex items-center justify-center gap-3">
                  <Icon name="eos-icons:loading" class="w-8 h-8 text-blue-500 animate-spin" />
                  <span class="text-lg">Loading products...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="products.length === 0" class="hover:bg-blue-50 transition-colors">
              <td colspan="9" class="px-6 py-12 text-center text-gray-500">
                <div class="flex flex-col items-center gap-4">
                  <div class="relative">
                    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon name="material-symbols:inventory" class="w-12 h-12 text-gray-400" />
                    </div>
                    <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon name="material-symbols:settings" class="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div class="text-center">
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                    <p class="text-gray-500 mb-4">Get started by adding your first product</p>
                    <button class="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
                      <Icon name="material-symbols:add" class="w-5 h-5" />
                      + Add Product
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-else v-for="product in products" :key="product.id" class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    <img v-if="product.image" :src="product.image" :alt="product.name" class="w-12 h-12 rounded-lg object-cover" />
                    <span v-else>{{ product.name?.charAt(0)?.toUpperCase() || 'P' }}</span>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-semibold text-gray-900">{{ product.name }}</div>
                    <div class="text-sm text-gray-500">{{ product.description?.substring(0, 50) }}{{ product.description?.length > 50 ? '...' : '' }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ product.category }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                <span class="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{{ product.sku }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                <span class="font-semibold text-green-600">${{ product.price?.toFixed(2) }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                <span :class="{
                  'px-2 py-1 text-xs rounded-full font-semibold': true,
                  'bg-red-100 text-red-800': product.stock <= 10,
                  'bg-yellow-100 text-yellow-800': product.stock > 10 && product.stock <= 50,
                  'bg-green-100 text-green-800': product.stock > 50
                }">
                  {{ product.stock }} units
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-3 py-2 text-xs rounded-full font-semibold shadow-sm': true,
                  'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200': product.status === 'Active',
                  'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200': product.status === 'Inactive',
                  'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200': product.status === 'Draft',
                  'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200': product.status === 'Archived'
                }">
                  {{ product.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ new Date(product.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end gap-2">
                  <button class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <Icon name="material-symbols:visibility" class="w-4 h-4" />
                  </button>
                  <button class="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-3 py-2 rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <Icon name="material-symbols:edit" class="w-4 h-4" />
                  </button>
                  <button class="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <Icon name="material-symbols:delete" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Quick Actions Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <NuxtLink to="/admin/sales_management/products/add" class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border border-blue-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105">
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Icon name="material-symbols:add-circle" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-blue-800 mb-2">Add New Product</h3>
            <p class="text-blue-600 text-sm">Create and configure new products</p>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/sales_management/products/categories" class="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-2xl shadow-lg border border-cyan-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105">
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Icon name="material-symbols:category" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-cyan-800 mb-2">Manage Categories</h3>
            <p class="text-cyan-600 text-sm">Organize products by categories</p>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/sales_management/products/inventory" class="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-2xl shadow-lg border border-teal-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105">
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-teal-500 to-teal-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Icon name="material-symbols:inventory-2" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-teal-800 mb-2">Inventory Management</h3>
            <p class="text-teal-600 text-sm">Track stock levels and updates</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import CountUp from "vue-countup-v3";
import { ref, onMounted, reactive } from 'vue'
import { useAuthStore } from "@/stores/AuthStore";
import Breadcrumb from "@/components/Breadcrumb.vue";

const authStore = useAuthStore()
authStore.sidebarOpen = true;

const products = ref([])
const stats = ref({})
const isLoading = ref(true)
const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => toast.show = false, 3000)
}

const fetchProducts = async () => {
  try {
    isLoading.value = true
    // Mock data for demonstration - replace with actual API call
    const mockProducts = [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        category: 'Electronics',
        sku: 'WH-001',
        price: 199.99,
        stock: 45,
        status: 'Active',
        createdAt: '2024-01-15',
        image: null
      },
      {
        id: 2,
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking with heart rate monitor',
        category: 'Wearables',
        sku: 'FW-002',
        price: 299.99,
        stock: 8,
        status: 'Active',
        createdAt: '2024-01-10',
        image: null
      },
      {
        id: 3,
        name: 'Portable Bluetooth Speaker',
        description: 'Waterproof portable speaker with 20-hour battery',
        category: 'Audio',
        sku: 'BS-003',
        price: 89.99,
        stock: 67,
        status: 'Active',
        createdAt: '2024-01-05',
        image: null
      }
    ]
    
    products.value = mockProducts
    stats.value = {
      totalProducts: mockProducts.length,
      activeProducts: mockProducts.filter(p => p.status === 'Active').length,
      categories: new Set(mockProducts.map(p => p.category)).size,
      totalValue: mockProducts.reduce((sum, p) => sum + (p.price * p.stock), 0)
    }
  } catch (error) {
    console.error('Failed to fetch products:', error)
    showToast('Failed to fetch products', 'error')
  } finally {
    isLoading.value = false
  }
}

// Fetch when component mounts
onMounted(async () => {
  await fetchProducts()
})
</script>

<style scoped>
/* Enhanced Products Management Dashboard Styles */
.products-management-dashboard {
  @apply p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen;
}

/* Custom animations and effects */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Apply animations to elements */
.products-management-dashboard > * {
  animation: fadeInUp 0.6s ease-out;
}

.products-management-dashboard > *:nth-child(2) {
  animation-delay: 0.1s;
}

.products-management-dashboard > *:nth-child(3) {
  animation-delay: 0.2s;
}

.products-management-dashboard > *:nth-child(4) {
  animation-delay: 0.3s;
}

/* Enhanced hover effects */
.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #3b82f6, #06b6d4);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #2563eb, #0891b2);
}

/* Enhanced focus states */
button:focus, a:focus, input:focus, select:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced card shadows */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive design improvements */
@media (max-width: 768px) {
  .products-management-dashboard {
    @apply p-4;
  }
  
  .bg-gradient-to-r.from-blue-600.via-cyan-600.to-teal-700 {
    @apply p-6;
  }
  
  .bg-gradient-to-r.from-blue-600.via-cyan-600.to-teal-700 h1 {
    @apply text-2xl;
  }
  
  .bg-gradient-to-r.from-blue-600.via-cyan-600.to-teal-700 p {
    @apply text-base;
  }
}

/* Loading animation enhancement */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Status badge enhancements */
.status-active {
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4);
}

.status-inactive {
  background: linear-gradient(135deg, #ef4444 0%, #f43f5e 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(239, 68, 68, 0.4);
}

.status-draft {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(245, 158, 11, 0.4);
}

.status-archived {
  background: linear-gradient(135deg, #6b7280 0%, #475569 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(107, 114, 128, 0.4);
}
</style>
