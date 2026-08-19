<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      <p class="text-gray-600 mt-1">Welcome to your business dashboard</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <!-- My Customers -->
      <div class="bg-white p-5 rounded-xl border shadow-sm">
        <div class="flex justify-between items-start mb-3">
          <div>
            <p class="text-gray-500 text-sm">My Solutions</p>
            <SkeletonLoader v-if="!customer" :lines="1" />

            <h3 v-else class="text-2xl font-bold mt-1">{{ customer?.solutions?.length }}</h3>
          </div>
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-green-600 text-sm">+12% from last month</p>
      </div>

      <!-- Customer Support -->
      <div class="bg-white p-5 rounded-xl border shadow-sm">
        <div class="flex justify-between items-start mb-3">
          <div>
            <p class="text-gray-500 text-sm">Support Tickets</p>
          <SkeletonLoader v-if="!customer" :lines="1" />
            <h3 v-else class="text-2xl font-bold mt-1">{{ customer?.tickets?.length }}</h3>
          </div>
          <div class="p-2 bg-orange-100 rounded-lg">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-red-600 text-sm">5 urgent</p>
      </div>

      <!-- Users -->
      <div class="bg-white p-5 rounded-xl border shadow-sm">
        <div class="flex justify-between items-start mb-3">
          <div>
            <p class="text-gray-500 text-sm">Active Users</p>
          <SkeletonLoader v-if="!customer" :lines="1" />
           <h3 v-else class="text-2xl font-bold mt-1">{{ customer?.end_users?.length }}</h3>
          </div>
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p class="text-green-600 text-sm">+8% from yesterday</p>
      </div>

      <!-- Deals -->
      <div class="bg-white p-5 rounded-xl border shadow-sm">
        <div class="flex justify-between items-start mb-3">
          <div>
            <p class="text-gray-500 text-sm">Deal Pipeline</p>
            <h3 class="text-2xl font-bold mt-1">$1.25M</h3>
          </div>
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-green-600 text-sm">+25% this quarter</p>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Solutions -->
        <div class="bg-white rounded-xl border p-5">
          <div class="flex items-center mb-5">
            <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
            <h2 class="text-xl font-semibold">Solutions</h2>
          </div>
          <div class="space-y-3">
             <SkeletonLoader v-if="!customer" class="space-y-3" :lines="5" height="30px"/>

            <div v-else v-for="solution in customer.solutions" :key="solution" class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p class="font-medium">{{ solution.name }}</p>
                <!-- <p class="text-sm text-gray-500">Customer relationship management</p> -->
              </div>
              <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Active</span>
            </div>
            <!-- <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium">Analytics Suite</p>
                <p class="text-sm text-gray-500">Data analysis and reporting</p>
              </div>
              <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Pending</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium">Mobile App</p>
                <p class="text-sm text-gray-500">Customer mobile application</p>
              </div>
              <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">In Development</span>
            </div> -->
          </div>
        </div>

        <!-- Software -->
        <div   class="bg-white rounded-xl border p-5">
          <div class="flex items-center mb-5">
            <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <h2 class="text-xl font-semibold">Software</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkeletonLoader v-if="!customer" class="space-y-3" :lines="1" height="130px"/>
              <SkeletonLoader v-if="!customer" class="space-y-3" :lines="1" height="130px"/>

            <div v-else  v-for="software in customer.softwares" :key="software" class="p-4 border rounded-lg">
              <div class="flex justify-between items-start mb-2">
                <p class="font-medium">{{ software.name }}</p>
                <span class="text-sm text-gray-500">v3.2.1</span>
              </div>
              <p class="text-sm text-gray-600 mb-3">Main application framework</p>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">450 users</span>
                <span class="text-green-600">● Active</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Training -->
        <div class="bg-white rounded-xl border p-5">
          <div class="flex items-center mb-5">
            <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <h2 class="text-xl font-semibold">Training</h2>
          </div>
          <div class="space-y-4">
            <div class="p-4 border rounded-lg">
              <div class="flex justify-between items-start mb-2">
                <p class="font-medium">New Software Onboarding</p>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Jan 15</span>
              </div>
              <p class="text-sm text-gray-600 mb-3">Training for updated platform features</p>
              <div class="flex justify-between text-sm text-gray-500">
                <span>24 participants</span>
                <span>2 hours</span>
              </div>
            </div>
            <div class="p-4 border rounded-lg">
              <div class="flex justify-between items-start mb-2">
                <p class="font-medium">Advanced Analytics</p>
                <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
              </div>
              <p class="text-sm text-gray-600 mb-3">Deep dive into reporting tools</p>
              <div class="flex justify-between text-sm text-gray-500">
                <span>18 participants</span>
                <span>3 hours</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="bg-white rounded-xl border p-5">
          <h2 class="text-xl font-semibold mb-5">Quick Stats</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <p class="text-2xl font-bold text-blue-600">92%</p>
              <p class="text-sm text-gray-600">Customer Satisfaction</p>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <p class="text-2xl font-bold text-green-600">85%</p>
              <p class="text-sm text-gray-600">Training Completion</p>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <p class="text-2xl font-bold text-purple-600">78%</p>
              <p class="text-sm text-gray-600">Deal Conversion</p>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <p class="text-2xl font-bold text-orange-600">2.4h</p>
              <p class="text-sm text-gray-600">Avg. Response Time</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
// Simple reactive data - optional for interactivity
import { ref } from 'vue'
import SkeletonLoader from '../SkeletonLoader.vue';
defineProps({
  customer: Object
})

const stats = ref({
  customers: 1242,
  support: 42,
  users: 856,
  deals: 1250000
})
</script>

<style scoped>
/* Optional: Add smooth transitions */
.bg-white {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bg-white:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
</style>
