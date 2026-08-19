<template>
  <div class="p-6 space-y-8 container mx-auto">
    <!-- LOADING -->
    <div v-if="loading" class="flex justify-center py-32">
      <div class="loading loading-spinner loading-lg"></div>
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="alert alert-error text-white">
      {{ error }}
    </div>

    <!-- CONTENT -->
    <div v-else>

      <!-- HEADER -->
      <div class="relative bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-400 rounded-3xl shadow-2xl overflow-hidden">
        <div class="relative z-10 px-6 py-8">

          <h1 class="text-4xl font-black text-white text-center mb-6">
            Manager Details
          </h1>

          <div class="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6">
            <h2 class="text-3xl font-bold text-white">
              {{ customer?.user_name || 'N/A' }}
            </h2>

            <div class="mt-4 flex flex-wrap gap-3 text-white/90">
              <span class="px-3 py-1 rounded-full bg-white/15">
                <i class="ri-phone-line mr-1"></i>
                {{ customer?.phone || 'N/A' }}
              </span>

              <span class="px-3 py-1 rounded-full bg-white/15">
                <i class="ri-user-3-line mr-1"></i>
                {{ customer?.gender || 'N/A' }}
              </span>

              <span class="px-3 py-1 rounded-full bg-white/15">
                <i class="ri-map-pin-line mr-1"></i>
                {{ customer?.address || 'N/A' }}
              </span>
            </div>
          </div>

        </div>
      </div>

      <!-- TAB CONTENT -->
      <div class="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-200">

        <!-- OVERVIEW TAB -->
        <div v-if="activeTab === 'overview'">

          <div class="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center gap-3">
              <i class="ri-team-line text-blue-600 text-xl"></i>
              <h3 class="text-lg font-semibold text-gray-800">Assigned Customers</h3>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left p-4 text-sm font-medium text-gray-600">Customer</th>
                  <th class="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                  <!-- <th class="text-left p-4 text-sm font-medium text-gray-600">Last Active</th> -->
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr 
                  v-for="cust in customer?.customers" 
                  :key="cust.id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-medium">
                        {{ cust.name.charAt(0) }}
                      </div>
                      <div>
                        <p class="font-medium text-gray-800">{{ cust.name }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="p-4">
                    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <i class="ri-checkbox-circle-line"></i>
                      Active
                    </span>
                  </td>
                  <!-- <td class="p-4 text-gray-600 text-sm">
                    2 days ago
                  </td> -->
                </tr>
              </tbody>
            </table>
            
            <div 
              v-if="!customer?.customers?.length"
              class="p-8 text-center text-gray-500"
            >
              <i class="ri-user-search-line text-3xl mb-3 opacity-50"></i>
              <p class="font-medium">No customers found</p>
              <p class="text-sm mt-1">Customers assigned will appear here</p>
            </div>
          </div>
        </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/config/api'

const route = useRoute()
const managerId = computed(() => route.params.id || route.query.id)

const loading = ref(true)
const error = ref(null)
const customer = ref(null)
const activeTab = ref('overview')

const fetchManager = async () => {
  try {
    const res = await api().get(
      `/customer-success-managers/by-user/${managerId.value}`
    )

    customer.value = res.data?.csm?.[0] || null

  } catch (err) {
    error.value = 'Failed to load manager details'
  } finally {
    loading.value = false
  }
}

onMounted(fetchManager)
</script>

<style scoped>
.badge {
  transition: all 0.3s ease;
}
.badge:hover {
  transform: translateY(-2px);
}
</style>