<template>
     <div class="sidebar fixed h-full w-64 bg-gray-800 text-white overflow-y-auto">
       <div class="p-4 border-b border-gray-700">
         <h2 class="text-xl font-semibold">Supply Chain Management Dashboard</h2>
         <h3 class="text-lg font-semibold pt-4 underline underline-offset-4">Welcome, {{authStore?.user?.department}} {{authStore?.user?.role}}</h3>
       </div>
       
       <nav class="p-2 space-y-1">
         <!-- Dashboard Links -->
         <NuxtLink 
           to="/" 
           class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors"
           active-class="bg-blue-600 hover:bg-blue-700"
         >
           <Icon name="material-symbols:dashboard" class="text-lg" />
           <span>Home</span>
         </NuxtLink>
         <NuxtLink 
           to="/admin/supply_chain_management" 
           class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors"
           active-class="bg-blue-600 hover:bg-blue-700"
         >
           <Icon name="material-symbols:dashboard" class="text-lg" />
           <span>Dashboard</span>
         </NuxtLink>
   
         
   
         <!-- Categories Section -->
         <!-- <div class="relative">
           <div
             class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
             :class="{'bg-gray-700 font-semibold': isActiveSection('categories')}"
             @click="toggleSection('categories')"
           >
             <div class="flex items-center gap-3">
               <Icon name="material-symbols:category" class="text-lg" />
               <span>Categories</span>
             </div>
             <Icon 
               name="heroicons:chevron-down" 
               class="text-lg transition-transform duration-200"
               :class="{'rotate-180': isActiveSection('categories')}" 
             />
           </div>
   
           <div
             class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
             :class="isActiveSection('categories') ? 'max-h-96 mt-1' : 'max-h-0'"
           >
             <NuxtLink 
               to="/admin/product_management/categories/create" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:add" class="text-lg" />
               <span>Create Category</span>
             </NuxtLink>
             <NuxtLink 
               to="/admin/product_management/categories" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:list" class="text-lg" />
               <span>View Categories</span>
             </NuxtLink>
           </div>
         </div> -->
   
         <!-- Subcategories Section -->
         <!-- <div class="relative">
           <div
             class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
             :class="{'bg-gray-700 font-semibold': isActiveSection('subcategories')}"
             @click="toggleSection('subcategories')"
           >
             <div class="flex items-center gap-3">
               <Icon name="material-symbols:layers" class="text-lg" />
               <span>Subcategories</span>
             </div>
             <Icon 
               name="heroicons:chevron-down" 
               class="text-lg transition-transform duration-200"
               :class="{'rotate-180': isActiveSection('subcategories')}" 
             />
           </div>
   
           <div
             class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
             :class="isActiveSection('subcategories') ? 'max-h-96 mt-1' : 'max-h-0'"
           >
             <NuxtLink 
               to="/admin/product_management/subcategories/create" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:add" class="text-lg" />
               <span>Create Subcategory</span>
             </NuxtLink>
             <NuxtLink 
               to="/admin/product_management/subcategories" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:list" class="text-lg" />
               <span>View Subcategories</span>
             </NuxtLink>
           </div>
         </div> -->

         <!-- Quotes Section -->
         <div class="relative">
           <div
             class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
             :class="{'bg-gray-700 font-semibold': isActiveSection('quotes')}"
             @click="toggleSection('quotes')"
           >
             <div class="flex items-center gap-3">
               <Icon name="material-symbols:local-shipping" class="text-lg" />
               <span>Quotes</span>
             </div>
             <Icon 
               name="heroicons:chevron-down" 
               class="text-lg transition-transform duration-200"
               :class="{'rotate-180': isActiveSection('quotes')}" 
             />
           </div>
   
           <div
             class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
             :class="isActiveSection('quotes') ? 'max-h-96 mt-1' : 'max-h-0'"
           >
             <NuxtLink 
               to="/admin/supply_chain_management/quotes" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:add" class="text-lg" />
               <span>Requested Quotes</span>
             </NuxtLink>
             <!-- <NuxtLink 
               to="/admin/supply_chain_management/quotes/approved" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:list" class="text-lg" />
               <span>Approved Quotes</span>
             </NuxtLink>
             <NuxtLink 
               to="/admin/supply_chain_management/quotes/rejected" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:remove" class="text-lg" />
               <span>Rejected Quotes</span>
             </NuxtLink> -->
           </div>
         </div>

         <!-- Vendors Section -->
         <div class="relative">
           <div
             class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
             :class="{'bg-gray-700 font-semibold': isActiveSection('vendors')}"
             @click="toggleSection('vendors')"
           >
             <div class="flex items-center gap-3">
               <Icon name="material-symbols:local-shipping" class="text-lg" />
               <span>Vendors</span>
             </div>
             <Icon 
               name="heroicons:chevron-down" 
               class="text-lg transition-transform duration-200"
               :class="{'rotate-180': isActiveSection('vendors')}" 
             />
           </div>
   
           <div
             class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
             :class="isActiveSection('vendors') ? 'max-h-96 mt-1' : 'max-h-0'"
           >
             <NuxtLink 
               to="/admin/supply_chain_management/vendors/create" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:add" class="text-lg" />
               <span>Create Vendor</span>
             </NuxtLink>
             <NuxtLink 
               to="/admin/supply_chain_management/vendors" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:list" class="text-lg" />
               <span>View Vendor</span>
             </NuxtLink>
           </div>
         </div>
   
         <!-- Suppliers Section -->
         <div class="relative">
           <div
             class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
             :class="{'bg-gray-700 font-semibold': isActiveSection('suppliers')}"
             @click="toggleSection('suppliers')"
           >
             <div class="flex items-center gap-3">
               <Icon name="material-symbols:local-shipping" class="text-lg" />
               <span>Suppliers</span>
             </div>
             <Icon 
               name="heroicons:chevron-down" 
               class="text-lg transition-transform duration-200"
               :class="{'rotate-180': isActiveSection('suppliers')}" 
             />
           </div>
   
           <div
             class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
             :class="isActiveSection('suppliers') ? 'max-h-96 mt-1' : 'max-h-0'"
           >
             <NuxtLink 
               to="/admin/supply_chain_management/suppliers/create" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:add" class="text-lg" />
               <span>Create Supplier</span>
             </NuxtLink>
             <NuxtLink 
               to="/admin/supply_chain_management/suppliers" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:list" class="text-lg" />
               <span>View Suppliers</span>
             </NuxtLink>
           </div>
         </div>
   
         <!-- Manufacturer Section -->
         <div class="relative">
           <div
             class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
             :class="{'bg-gray-700 font-semibold': isActiveSection('brands')}"
             @click="toggleSection('brands')"
           >
             <div class="flex items-center gap-3">
               <Icon name="material-symbols:branding-watermark" class="text-lg" />
               <span>Manufacturer</span>
             </div>
             <Icon 
               name="heroicons:chevron-down" 
               class="text-lg transition-transform duration-200"
               :class="{'rotate-180': isActiveSection('brands')}" 
             />
           </div>
   
           <div
             class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
             :class="isActiveSection('brands') ? 'max-h-96 mt-1 ' : 'max-h-0'"
           >
             <NuxtLink 
               to="/admin/supply_chain_management/manufacturer/create" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:add" class="text-lg" />
               <span>Create Manufacturer</span>
             </NuxtLink>
             <NuxtLink 
               to="/admin/supply_chain_management/manufacturer" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:list" class="text-lg" />
               <span>View Manufacturers</span>
             </NuxtLink>
           </div>
         </div>

         <!-- Products Section -->
         <div class="relative">
           <div
             class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
             :class="{'bg-gray-700 font-semibold': isActiveSection('products')}"
             @click="toggleSection('products')"
           >
             <div class="flex items-center gap-3">
               <Icon name="material-symbols:inventory" class="text-lg" />
               <span>Products</span>
             </div>
             <Icon 
               name="heroicons:chevron-down" 
               class="text-lg transition-transform duration-200"
               :class="{'rotate-180': isActiveSection('products')}" 
             />
           </div>
   
           <div
             class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
             :class="isActiveSection('products') ? 'max-h-96 mt-1' : 'max-h-0'"
           >
             <!-- <NuxtLink 
               to="/admin/supply_chain_management/products/create" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:add" class="text-lg" />
               <span>Create Product</span>
             </NuxtLink> -->
             <NuxtLink 
               to="/admin/supply_chain_management/products/list" 
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:list" class="text-lg" />
               <span>View Products</span>
             </NuxtLink>
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
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
   const activeSections = ref(new Set())
   
   const isActiveSection = (section) => {
     return route.path.startsWith(`/admin/supply_chain_management/${section}`) || 
            activeSections.value.has(section)
   }
   
   const toggleSection = (section) => {
     // If the section is already active, close it
     if (activeSections.value.has(section)) {
       activeSections.value.delete(section)
     } else {
       // Close all other sections first
       activeSections.value.clear()
       // Then open the clicked section
       activeSections.value.add(section)
     }
   }
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
   
   .router-link-active.router-link-exact-active {
     background-color: rgb(37 99 235);
   }
   
   .router-link-active.router-link-exact-active:hover {
     background-color: rgb(29 78 216);
   }
   </style>