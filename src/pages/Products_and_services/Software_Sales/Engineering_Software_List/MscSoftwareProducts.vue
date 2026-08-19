<template>
  <div id="products" class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 scroll-mt-20">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 p-8 md:p-10">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
        </div>
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">
            MSC Software Product Catalog
          </h2>
          <p class="text-blue-200">Complete range of simulation and analysis tools</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-8 md:p-10">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
          <p class="text-lg text-gray-700 leading-relaxed">
            Hi-Tech SoftSys, Inc. provides comprehensive MSC Software products with <span class="font-bold text-blue-600">FREE 24/7 technical support</span> to clients worldwide.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <component
          v-for="(product, index) in products"
          :key="index"
          :is="product.hasDetailPage ? 'RouterLink' : 'div'"
          :to="product.hasDetailPage ? product.route : undefined"
          class="group flex items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-200 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1"
          :class="{ 'cursor-pointer': product.hasDetailPage }"
        >
          <div class="w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mr-4 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
          <span class="text-gray-800 text-lg font-medium group-hover:text-blue-700 transition-colors flex-1">{{ product.name }}</span>
          <svg v-if="product.hasDetailPage" class="w-5 h-5 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </component>
      </div>

      <!-- Product Count Badge -->
      <div class="mt-8 text-center">
        <div class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
          </svg>
          <span class="font-bold">{{ products.length }} Premium Products Available</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const products = [
  { name: "MSC Nastran", hasDetailPage: true, route: "/Products_and_services/Software_Sales/products/msc-nastran" },
  { name: "Patran", hasDetailPage: true, route: "/Products_and_services/Software_Sales/products/patran" },
  { name: "Marc", hasDetailPage: true, route: "/Products_and_services/Software_Sales/products/marc" },
  { name: "Dytran", hasDetailPage: true, route: "/Products_and_services/Software_Sales/products/dytran" },
  { name: "MSC Apex", hasDetailPage: true, route: "/Products_and_services/Software_Sales/products/apex" },
  { name: "Actran", hasDetailPage: true, route: "/Products_and_services/Software_Sales/products/actran" },
  { name: "Adams", hasDetailPage: false },
  { name: "CAEfatigue", hasDetailPage: false },
  { name: "MSC CoSim", hasDetailPage: false },
  { name: "MSC One", hasDetailPage: false },
  { name: "MSC Apex Generative Design", hasDetailPage: false },
  { name: "Cradle CFD", hasDetailPage: false },
  { name: "Digimat", hasDetailPage: false },
  { name: "Easy5", hasDetailPage: false },
  { name: "Simufact", hasDetailPage: false },
  { name: "SimManager", hasDetailPage: false },
  { name: "MaterialCenter", hasDetailPage: false },
  { name: "FEA, AFEA, TFEA", hasDetailPage: false },
  { name: "Forming", hasDetailPage: false },
  { name: "Virtual Test Drive", hasDetailPage: false },
  { name: "ODYSSEE", hasDetailPage: false },
  { name: "VGSTUDIO MAX", hasDetailPage: false },
  { name: "Romax", hasDetailPage: false },
  { name: "PICLS", hasDetailPage: false }
]
</script>
